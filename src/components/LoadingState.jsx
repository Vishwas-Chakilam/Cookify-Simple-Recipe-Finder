import React from 'react';
import { motion } from 'framer-motion';

const LoadingState = () => (
  <div className="flex flex-col items-center justify-center p-8">
    <motion.div
      animate={{ rotate: 360 }}
      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
      className="w-12 h-12 border-4 border-orange-500 border-t-transparent rounded-full"
    />
    <p className="mt-4 text-gray-600">Loading...</p>
  </div>
);

export default LoadingState;