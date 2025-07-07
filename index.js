const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { createClient } = require('@supabase/supabase-js');

const app = express();
const port = 3000;

// Replace with your Supabase credentials
const supabaseUrl = 'https://lnfnhjtqvujghcpkkopb.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxuZm5oanRxdnVqZ2hjcGtrb3BiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTE4ODM0MzgsImV4cCI6MjA2NzQ1OTQzOH0.xniicg7v5BxgQdU_5AW0eRB0FnRJqkZ9H-08FHuPL4E';
const supabase = createClient(supabaseUrl, supabaseKey);

app.use(cors());
app.use(bodyParser.json());

app.post('/api/data', async (req, res) => {
    const { temperature } = req.body;

    if (typeof temperature !== 'number') {
        return res.status(400).json({ error: 'Missing or invalid temperature' });
    }

    try {
        const { data, error } = await supabase
            .from('sensor_data')
            .insert([{ temperature }]);

        if (error) {
            console.error('Supabase error:', error);
            return res.status(500).json({ error: 'Supabase insert failed' });
        }

        res.status(200).json({ message: 'Data received', data });
    } catch (err) {
        console.error('Server error:', err.message);
        res.status(500).json({ error: 'Server error' });
    }
});


app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
