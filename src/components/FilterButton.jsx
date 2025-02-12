import React from 'react';
import { clsx } from 'clsx';

const FilterButton = ({ active, onClick, children, icon: Icon }) => (
  <button
    onClick={onClick}
    className={clsx(
      'filter-button', // Base class
      active ? 'filter-button-active' : 'filter-button-inactive' // Active state class
    )}
  >
    <Icon
      className={clsx('text-lg', active ? 'text-white' : 'text-orange-500')}
    />{' '}
    {/* Icon component */}
    {children}
  </button>
);

export default FilterButton;
