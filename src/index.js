export default {
  async fetch(req) {
    const url = new URL(req.url)

    // strip Accept only for /images/
    if (url.pathname.startsWith('/images/')) {
      const h = new Headers(req.headers)
      h.delete('Accept')
      const newReq = new Request(req, { headers: h })

      const resp = await fetch(newReq)

      // add debug header so we can see it later
      const respHeaders = new Headers(resp.headers)
      respHeaders.set('x-cf-worker', 'accept-removed')
      return new Response(resp.body, {
        status: resp.status,
        headers: respHeaders,
      })
    }

    // fallback
    return fetch(req)
  }
}



