'use client';

import { Terminal } from '../components/Terminal';
import { CustomCursor } from '../components/CustomCursor';

export default function Home() {
  return (
    <>
      <CustomCursor />
      <Terminal />
    </>
  );
}