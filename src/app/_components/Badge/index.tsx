import React from 'react';

import { clsx } from 'clsx';

const COLOR_MAPPING: Record<string, string> = {
  bug: 'bg-lime-600 text-white',
  dark: 'bg-gray-500 text-white',
  dragon: 'bg-red-500 text-white',
  electric: 'bg-yellow-400',
  fairy: 'bg-pink-300',
  fighting: 'bg-orange-700 text-white',
  fire: 'bg-orange-400 text-white',
  flying: 'bg-cyan-500',
  ghost: 'bg-violet-500 text-white',
  grass: 'bg-green-500',
  ground: 'bg-yellow-500',
  ice: 'bg-sky-400',
  normal: 'bg-slate-400',
  poison: 'bg-purple-400 text-white',
  psychic: 'bg-pink-400 text-white',
  rock: 'bg-amber-500 text-white',
  shadow: 'bg-slate-700 text-white',
  steel: 'bg-gray-300',
  water: 'bg-blue-500 text-white',
}

type BadgeProps = {
  type: keyof typeof COLOR_MAPPING,
}

export function Badge({ type }: BadgeProps) {
  return <div className={clsx('w-20 capitalize text-center rounded', COLOR_MAPPING[type])}>
    {type}
  </div>
}
