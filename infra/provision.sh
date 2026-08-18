#!/bin/bash
# ============================================================
# ClinicaFácil — Script de Provisionamento de VPS (Ubuntu 22.04)
# ============================================================
# 
# Executar como root após instalação limpa do Ubuntu 22.04 LTS.
# Configura: UFW, fail2ban, Docker, backup automático, segurança.
#
# Uso: chmod +x provision.sh && sudo ./provision.sh
# ============================================================

set -euo pipefail

echo "🚀 ClinicaFácil — Provisionamento de VPS"
echo "================================================"

# --- Configurações básicas ---
SSH_PORT=2222
APP_DIR=/opt/clinicafacil

# --- Atualizar sistema ---
echo "[1/10] Atualizando pacotes..."
apt-get update -y && apt-get upgrade -y

# --- Criar usuário de deploy ---
echo "[2/10] Criando usuário de deploy..."
if ! id -u deploy &>/dev/null; then
  useradd -m -s /bin/bash deploy
  usermod -aG docker deploy
  mkdir -p /home/deploy/.ssh
  chmod 700 /home/deploy/.ssh
fi

# --- Instalar Docker ---
echo "[3/10] Instalando Docker..."
if ! command -v docker &>/dev/null; then
  curl -fsSL https://get.docker.com -o /tmp/get-docker.sh
  sh /tmp/get-docker.sh
fi
systemctl enable docker

# --- Configurar UFW ---
echo "[4/10] Configurando firewall (UFW)..."
ufw default deny incoming
ufw default allow outgoing
ufw allow 80/tcp
ufw allow 443/tcp
ufw allow $SSH_PORT/tcp
ufw --force enable
ufw status verbose

echo "[INFO] Portas abertas: 80 (HTTP), 443 (HTTPS), $SSH_PORT (SSH)"

# --- Proteger SSH ---
echo "[5/10] Protegendo SSH..."

# Backup da config original
cp /etc/ssh/sshd_config /etc/ssh/sshd_config.bak

# Alterar porta SSH
sed -i "s/^#Port 22/Port $SSH_PORT/" /etc/ssh/sshd_config
sed -i "s/^Port 22/Port $SSH_PORT/" /etc/ssh/sshd_config

# Desabilitar login root e autenticação por senha
sed -i 's/^#PermitRootLogin yes/PermitRootLogin no/' /etc/ssh/sshd_config
sed -i 's/^PermitRootLogin yes/PermitRootLogin no/' /etc/ssh/sshd_config
sed -i 's/^#PasswordAuthentication yes/PasswordAuthentication no/' /etc/ssh/sshd_config
sed -i 's/^PasswordAuthentication yes/PasswordAuthentication no/' /etc/ssh/sshd_config
sed -i 's/^#ChallengeResponseAuthentication yes/ChallengeResponseAuthentication no/' /etc/ssh/sshd_config

systemctl restart sshd

echo "[INFO] SSH configurado na porta $SSH_PORT com autenticação por chave apenas"

# --- fail2ban ---
echo "[6/10] Configurando fail2ban..."
apt-get install -y fail2ban

cat > /etc/fail2ban/jail.local << 'FAIL2BAN'
[DEFAULT]
bantime = 3600
findtime = 600
maxretry = 5

[sshd]
enabled = true
port = ssh,2222
maxretry = 5
bantime = 86400

[nginx-http-auth]
enabled = true
FAIL2BAN

systemctl restart fail2ban

# --- Instalar Docker Compose ---
echo "[7/10] Instalando Docker Compose..."
if ! command -v docker-compose &>/dev/null; then
  curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
  chmod +x /usr/local/bin/docker-compose
fi

# --- Backup automático do banco ---
echo "[8/10] Configurando backup automático..."
mkdir -p /opt/backups

cat > /opt/backups/backup.sh << 'BACKUP'
#!/bin/bash
set -e
TIMESTAMP=$(date +%Y-%m-%d_%H-%M)
BACKUP_DIR=/opt/backups
RETENTION_DAYS=30

mkdir -p $BACKUP_DIR

docker exec clinicafacil-postgres pg_dump -U clinicafacil -d clinicafacil -Fc \
  > "$BACKUP_DIR/clinicafacil_$TIMESTAMP.dump"

find $BACKUP_DIR -name "clinicafacil_*.dump" -mtime +$RETENTION_DAYS -delete

echo "Backup concluído: clinicafacil_$TIMESTAMP.dump"
BACKUP

chmod +x /opt/backups/backup.sh

# Cron: backup diário às 3h da manhã
(crontab -l 2>/dev/null; echo "0 3 * * * /opt/backups/backup.sh >> /var/log/backups.log 2>&1") | crontab -

echo "[9/10] Criando diretório de SSL..."
mkdir -p /opt/clinicafacil/ssl

# --- Certbot SSL ---
echo "[10/10] Configurando Certbot..."
apt-get install -y certbot python3-certbot-nginx

echo ""
echo "✅ Provisionamento concluído!"
echo ""
echo "PRÓXIMOS PASSOS:"
echo "  1. Configure os registros DNS (A) no Cloudflare:"
echo "     - clinicafacil.com.br → IP da VPS"
echo "     - api.clinicafacil.com.br → IP da VPS"
echo "  2. Ative o proxy do Cloudflare (DNS Proxy = ⚡ Laranja)"
echo "  3. SSL via Certbot: certbot --nginx -d clinicafacil.com.br -d api.clinicafacil.com.br"
echo "  4. Copie o projeto para /opt/clinicafacil/"
echo "  5. Configure .env.production com as variáveis reais"
echo "  6. Execute: docker compose -f docker-compose.prod.yml up -d --build"
echo "  7. Execute backup: /opt/backups/backup.sh"
echo ""
echo "⚠️  Certifique-se de:"
echo "  - Copiar sua chave SSH pública para /home/deploy/.ssh/authorized_keys"
echo "  - Gerar secrets JWT com: openssl rand -hex 64"
echo "  - Colocar o PostgreSQL e Redis dentro da rede Docker (não expostos)"