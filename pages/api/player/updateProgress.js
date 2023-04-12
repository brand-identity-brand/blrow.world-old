import { supabase } from '@/lib/supabaseClient';

export default async function handler(req, res) {
    if (req.method === 'POST') {
        // Process a POST request
        const {
            player,
            progressState
        } = req.body;

        const { data, error } = await supabase
            .from('player')
            .update({ 
                progress_context: progressState,
                updated_at: 'now()'
            })
            .eq('id', player)
            .select();

        res.status(200).json({ result: 'success' });
                    
    } else {
        // Handle any other HTTP method
    }
    // res.status(200).json({ name: 'John Doe' })
}