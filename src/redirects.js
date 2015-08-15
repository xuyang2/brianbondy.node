export function setupRedirects(server) {

  server.route({
    method: 'GET',
    path: '/blog/modified/{year}',
    handler: function (request, reply) {
      reply.redirect(`/blog/posted/${request.params.year}`).permanent();
    }
  });

  server.route({
    method: 'GET',
    path: '/blog/id/{id}/{slug}',
    handler: function (request, reply) {
      reply.redirect(`/blog/${request.params.id}`).permanent();
    }
  });

  server.route({
    method: 'GET',
    path: '/blog/id/{id}',
    handler: function (request, reply) {
      reply.redirect(`/blog/${request.params.id}`).permanent();
    }
  });

   server.route({
    method: 'GET',
    path: '/mozilla/cheatsheet',
    handler: function (request, reply) {
      reply.redirect('http://www.codefirefox.com/cheatsheet').permanent();
    }
  });

  // Note that I'm intentionally not using the stripTrailingSlash: true option because it
  // simply serves a second endpoint which is bad for PR juice.  301 is better.
  const maxDepth = 6;
  let handler = (request, reply) => reply.redirect(`/${request.params.p}`).permanent();
  for (var i = 1; i <= maxDepth; i++) {
    server.route({
      method: 'GET',
      path: `/{p*${i}}/`,
      handler,
    });
  }
}
