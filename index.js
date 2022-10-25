import * as http from 'node:http'
import {
    readFile
} from 'node:fs/promises'

//Format response
const resWrap = async (res, path) => {
    const data = await readFile(`./public/${path}.html`)
    if (!data) {
        res.writeHead(404)
        res.write('Oops! file not found!!!')
    } else {
        res.writeHead(200, {
            'Content-Type': 'text/html'
        })
        res.write(data)
        res.end()
    }
}

//Define routes
const routes = {
    '/home': function home(req, res) {
        resWrap(res, 'home')
    },
    '/contact': function contact(req, res) {
        resWrap(res, 'contact')
    },
    '/about': function about(req, res) {
        resWrap(res, 'about')
    },
    notFound: (req, res) => {
        res.writeHead(404)
        res.end(http.STATUS_CODES[404])
    }
}

//Define Port
const port = process.env.PORT || 3000

//Create and listen to server
const server = http.createServer((req, res) => {
    if (req.url === '/') {
        return routes['/home'](req, res)
    } else if (req.url in routes) {
        return routes[req.url](req, res)
    } else {
        return routes.notFound(req, res)
    }
}).listen(port)