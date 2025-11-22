import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';
import { ADMIN_CREDENTIALS } from '@/lib/auth';

export async function GET(request: NextRequest) {
    try {
        // Basic security check matching the client-side auth
        const authHeader = request.headers.get('x-admin-auth');

        if (authHeader !== 'true') {
            return NextResponse.json(
                { error: 'Unauthorized' },
                { status: 401 }
            );
        }

        const { data, error } = await supabaseAdmin
            .from('primai_form_submissions')
            .select('*')
            .order('created_at', { ascending: false });

        if (error) {
            console.error('Supabase error:', error);
            return NextResponse.json(
                { error: 'Failed to fetch submissions' },
                { status: 500 }
            );
        }

        return NextResponse.json(data || [], { status: 200 });
    } catch (error) {
        console.error('Error fetching submissions:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}

export async function DELETE(request: NextRequest) {
    try {
        const authHeader = request.headers.get('x-admin-auth');

        if (authHeader !== 'true') {
            return NextResponse.json(
                { error: 'Unauthorized' },
                { status: 401 }
            );
        }

        const body = await request.json();
        const { ids } = body;

        if (!ids || !Array.isArray(ids) || ids.length === 0) {
            return NextResponse.json(
                { error: 'Invalid request: ids array required' },
                { status: 400 }
            );
        }

        const { error } = await supabaseAdmin
            .from('primai_form_submissions')
            .delete()
            .in('id', ids);

        if (error) {
            console.error('Supabase error:', error);
            return NextResponse.json(
                { error: 'Failed to delete submissions' },
                { status: 500 }
            );
        }

        return NextResponse.json({ message: 'Submissions deleted successfully' }, { status: 200 });
    } catch (error) {
        console.error('Error deleting submissions:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}
