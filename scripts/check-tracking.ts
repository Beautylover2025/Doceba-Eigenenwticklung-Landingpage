import { supabase } from '../lib/supabaseClient';

async function checkTracking() {
    console.log('🔍 Checking funnel_submissions table...\n');

    // Get all submissions from last 14 days
    const fourteenDaysAgo = new Date();
    fourteenDaysAgo.setDate(fourteenDaysAgo.getDate() - 14);

    const { data, error } = await supabase
        .from('funnel_submissions')
        .select('*')
        .gte('updated_at', fourteenDaysAgo.toISOString())
        .order('updated_at', { ascending: false });

    if (error) {
        console.error('❌ Error querying database:', error);
        return;
    }

    console.log(`📊 Total submissions in last 14 days: ${data?.length || 0}\n`);

    if (data && data.length > 0) {
        console.log('Recent submissions:\n');
        data.forEach((item, index) => {
            console.log(`[${index + 1}] ${new Date(item.updated_at).toLocaleString('de-DE')}`);
            console.log(`    Session: ${item.session_id?.substring(0, 8)}...`);
            console.log(`    Last Step: ${item.last_step}`);
            console.log(`    AB Variant: ${item.ab_variant || 'null'}`);
            console.log(`    Source Page: ${item.source_page || 'null'}`);
            console.log(`    Traffic Source: ${item.traffic_source || 'null'}`);
            console.log(`    UTM Source: ${item.utm_source || 'null'}`);
            console.log(`    UTM Campaign: ${item.utm_campaign || 'null'}`);
            console.log(`    Email: ${item.email || 'null'}`);
            console.log('');
        });
    }

    // Check completed submissions
    const { data: completedData } = await supabase
        .from('funnel_submissions')
        .select('*')
        .eq('last_step', 'submission_completed')
        .gte('updated_at', fourteenDaysAgo.toISOString())
        .order('updated_at', { ascending: false });

    console.log(`\n✅ Completed submissions (last_step = 'submission_completed'): ${completedData?.length || 0}\n`);

    if (completedData && completedData.length > 0) {
        completedData.forEach((item, index) => {
            console.log(`[${index + 1}] ${new Date(item.updated_at).toLocaleString('de-DE')}`);
            console.log(`    Email: ${item.email || 'null'}`);
            console.log(`    AB Variant: ${item.ab_variant || 'null'}`);
            console.log(`    Traffic Source: ${item.traffic_source || 'null'}`);
            console.log('');
        });
    }
}

checkTracking();
