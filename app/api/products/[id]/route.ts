// app/api/products/[id]/route.ts
import { NextRequest, NextResponse } from 'next/server';
import supabase from '@/lib/supabase';

export async function DELETE(_: NextRequest, { params }: { params: { id: string } }) {
  const { id } = params;
  const { error } = await supabase.from('products').delete().eq('id', id);

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ success: true });
}
