import { createServerClient } from '@supabase/ssr';
import { NextResponse } from 'next/server';

export async function GET(request) {
    const { searchParams } = new URL(request.url);
    const table = searchParams.get('table');

    if (!table) {
        return NextResponse.json({ error: 'Table query parameter is required' }, { status: 400 });
    }

    const supabase = createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
        {
            cookies: {
                get(name) {
                    return request.cookies.get(name)?.value;
                },
                set(name, value, options) {
                    request.cookies.set({
                        name,
                        value,
                        ...options,
                    });
                },
                remove(name, options) {
                    request.cookies.set({
                        name,
                        value: '',
                        ...options,
                    });
                },
            },
        }
    );

    const { data, error } = await supabase
        .from(table)
        .select('*');

    if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(data, { status: 200 });
}