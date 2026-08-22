import React from 'react';
import { PokemonType } from '../types';
import { TYPE_COLORS } from '../data/typeChart';

interface TypeBadgeProps {
  type: PokemonType;
  size?: 'xs' | 'sm' | 'md' | 'lg';
  showIcon?: boolean;
}

export const TypeBadge: React.FC<TypeBadgeProps> = ({ type, size = 'sm' }) => {
  const style = TYPE_COLORS[type] || TYPE_COLORS.Normal;

  const sizeClasses = {
    xs: 'text-[10px] px-1.5 py-0.5 font-medium',
    sm: 'text-xs px-2 py-0.5 font-semibold',
    md: 'text-sm px-2.5 py-1 font-semibold',
    lg: 'text-base px-3 py-1.5 font-bold',
  }[size];

  return (
    <span
      className={`inline-flex items-center justify-center rounded-md uppercase tracking-wider transition-transform duration-150 ${sizeClasses} ${style.bg} ${style.text} shadow-xs`}
    >
      {type}
    </span>
  );
};
