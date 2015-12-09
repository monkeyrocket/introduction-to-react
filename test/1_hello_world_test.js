import React from 'react';
import '../src/index';
import {expect} from 'chai';


describe('Rendering', () => {
  it('show hello world', () => { 
    expect(global.document.getElementsByTagName("H1")[0].innerHTML).to.equal('Hello World!')    
  })
})
