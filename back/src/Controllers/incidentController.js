const connection = require('../database/connection');

module.exports = {
    async index(req, res) {
        const { pages = 1 } = req.query;

        const [count] = await connection('incidents').count();

        console.log(count);

        const incidents = await connection('incidents')
                .join('ongs', 'ong_id' , '=', 'incidents.ong_id')
                .limit(5)
                .offset((pages - 1) * 5)
                .select(['incidents.*', 
                'ongs.name', 
                'ongs.whatsapp', 
                'ongs.email', 
                'ongs.city', 
                'ongs.uf'
            ]);

        res.header('X-total-count', count['count(*)']);
    
        return res.json (incidents);
    },

    async create(req, res) {
        const { title, description, value } = req.body;
        const ong_id = req.headers.authorizantion;

        const [id] = await connection('incidents').insert({
            ong_id,
            title,
            description,
            value,
        })

        return res.json({ id })
    },

    async delete(req, res) {
        const { id } = req.params;
        const ong_id = req.headers.authorizantion;

        const incidents = await connection('incidents').where('id', id).select('ong_id').first();

        if (incidents.ong_id != ong_id){
            return res.status(401).json({ error: "Operation not permitted" });
        }

        await connection('incidents').where('id', id).del();

        return res.status(204).json({message: "Caso deletado"});
    }
}