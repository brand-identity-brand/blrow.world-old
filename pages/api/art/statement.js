import { supabase } from '@/lib/supabaseClient';

export default async function handler(req, res) {
    if (req.method === 'POST') {
        // Process a POST request
        const {
            player,
            stage,
            art,
            statement
        } = req.body;

        const { data, error } = await supabase
            .from('gallery')
            .select()
            .eq('player_id', player)
            .eq('stage', stage)
            .eq('art', art);
        if ( data.length === 0 ) {
            const { data, error } = await supabase
                .from('gallery')
                .insert({
                    player_id: player,
                    stage,
                    art,
                    statement
                })
                .select();
            
            res.status(200).json({ result: 'success' });
        } else {
            const { data, error } = await supabase
                .from('gallery')
                .update({ 
                    statement,
                    updated_at: 'now()'
                })
                .eq('player_id', player)
                .eq('stage', stage)
                .eq('art', art)
                .select();

            res.status(200).json({ result: 'success' });
        }
                    
    } else {
        // Handle any other HTTP method
    }
    // res.status(200).json({ name: 'John Doe' })
}