import React from 'react';
import { Badge } from '../Badge';
import { Type } from '@prisma/client';

type PokemonCardTypes = {
  id: string,
  pokemonId: number | null,
  name: string,
  image: string | null,
  types: Type[],
};

export function PokemonCard({ id, pokemonId, name, image, types }: PokemonCardTypes) {
  return (
    <div className='space-y-1'>
      {image && <img src={image} alt={name} className='w-full bg-slate-100 rounded p-4' /> }
      <p className='text-sm text-slate-400 font-bold'>#{pokemonId ? pokemonId.toString().padStart(4, '0') : id}</p>
      <h3 className='text-lg font-medium capitalize'>{name}</h3>
      <ul className='flex flex-row gap-2'>{types.map(type => <li><Badge type={type.name} /></li>)}</ul>
    </div>
  );
};
