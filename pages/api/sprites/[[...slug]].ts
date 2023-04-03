import fs from 'fs'
import type { NextApiRequest, NextApiResponse } from 'next'
import path from 'path'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.query.slug && req.query.slug.length) {
        const slug = Array.isArray(req.query.slug) ? req.query.slug : [req.query.slug]
        fs.readFile(path.join(process.cwd(), 'sprites', ...slug), (error, data) => {
            if (error) {
                return res.status(404).send(null)
            }
            res.setHeader('Content-Type', 'image/png')
            res.setHeader('Cache-Control', 'max-age=31536000')
            return res.status(200).send(data)
        })
    } else {
        res.status(404).send(null)
    }
}
