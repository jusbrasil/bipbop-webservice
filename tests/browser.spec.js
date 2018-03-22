/* global BipbopWebService */

const { WebService } = BipbopWebService;

describe('#halo', () => {
  const ws = new WebService();
  it('#works', () =>
    ws.request("SELECT FROM 'INFO'.'INFO'", {
      SimpleTest: 'ThisIsASimpleTest',
    }).then(response => response.text())
      .then(content => WebService.parse(content))
      .then(({ BPQL }) => {
        if (BPQL.header.query !== 'SELECT FROM \'INFO\'.\'INFO\'') {
          throw new Error('Ocorreu uma falha! A consulta não confere!');
        }
      }));
});

