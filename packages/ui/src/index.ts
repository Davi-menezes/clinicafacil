import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export { Button, type ButtonProps } from './button';
export { Card, CardHeader, CardContent, CardFooter } from './card';
export { Input } from './input';
export { Badge } from './badge';
export { StarRating } from './star-rating';
export { Avatar, AvatarImage, AvatarFallback } from './avatar';
export { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './dialog';
export { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from './select';