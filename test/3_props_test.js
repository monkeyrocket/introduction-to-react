import React from 'react';
import ReactDOM from 'react-dom';
import ReactTestUtils from 'react-addons-test-utils';
import App from '../src/components/app'; 
import TodoList from '../src/components/todo_list';
import {expect} from 'chai';

const { renderIntoDocument, scryRenderedDOMComponentsWithTag } = ReactTestUtils;


describe('props',()=>{
  it('render your name in a h1',()=>{
    const component = renderIntoDocument(
      <App name={'Kenny Powers'}/>
    );
    const headings    = scryRenderedDOMComponentsWithTag(component, 'h1');
    const nameHeading = headings.map((heading)=> {return heading.textContent})
                            .filter((heading)=> {return heading == 'Kenny Powers\'s todo list'})[0]

    expect(nameHeading).to.equal('Kenny Powers\'s todo list') 
  })

  it('renders task from an array',()=>{
    const tasks = ['Buy new Handson cd', 'Walk the dog', 'Call Mum', 'Pay phone bill']
    const component = renderIntoDocument(
      <TodoList tasks={tasks}/>
    );

    const taskList = scryRenderedDOMComponentsWithTag(component, 'li');

    expect(taskList.length).to.equal(4)
    tasks.forEach((task,index)=>{
      expect(taskList[index].textContent).to.equal(task) 
    })
  })

  it('add a key to each task',()=>{
    const tasks = ['Buy new Handson cd', 'Walk the dog', 'Call Mum', 'Pay phone bill']
    const component = renderIntoDocument(
      <TodoList tasks={tasks}/>
    );

    const taskList = scryRenderedDOMComponentsWithTag(component, 'li');

    taskList.forEach((task,index)=>{
      expect(parseInt(task._reactInternalComponent._currentElement.key)).to.equal(index)
    })
  })
})