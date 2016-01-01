import React from 'react';
import ReactTestUtils from 'react-addons-test-utils';
import App from '../src/components/app';
import TodoList from '../src/components/todo_list';
import {expect} from 'chai';

const { renderIntoDocument, 
        scryRenderedDOMComponentsWithTag, 
        Simulate } = ReactTestUtils;



describe("Tasks", ()=>{
  it('can mark as complete', ()=>{
    let completeTask;
    const handleCheckTask = (id) => completeTask = id;
    const tasks = ['Buy Milk']

    const component = renderIntoDocument(
      <TodoList onCheckTask={handleCheckTask} tasks={tasks}/>
    );
    const checkbox = scryRenderedDOMComponentsWithTag(component, 'input')[0];
    Simulate.change(checkbox, {target: {checked: true}});
    

    expect(completeTask).to.equal(0);
  });

  it('has a clear button',()=>{
    const component = renderIntoDocument(
      <App name={'Kenny Powers'}/>
    );
    const buttons     = scryRenderedDOMComponentsWithTag(component, 'button')
    const clearButton = buttons.find((button)=> {return button.textContent == 'Clear'})
                            
    expect(clearButton).to.not.an('undefined')
  })

  it('can clear completed', ()=>{
    let tasks;
    const component = renderIntoDocument(
      <App name={'Kenny Powers'}/>
    );

    const taskInput   = scryRenderedDOMComponentsWithTag(component, 'input')[0];
    const buttons     = scryRenderedDOMComponentsWithTag(component, 'button')
    
    expect(buttons.length).to.equal(2)

    const addButton   = buttons.find((button)=> {return button.textContent == 'Add'}); 
    const clearButton = buttons.find((button)=> {return button.textContent == 'Clear'}); 

    Simulate.change(taskInput,{target: {value: 'buy milk'}});
    Simulate.click(addButton);
    Simulate.change(taskInput,{target: {value: 'walk dog'}});
    Simulate.click(addButton);

    tasks = scryRenderedDOMComponentsWithTag(component, 'li');

    expect(tasks.length).to.equal(2)
    expect(tasks[0].textContent).to.equal('buy milk')
    expect(tasks[1].textContent).to.equal('walk dog')

    const checkbox = scryRenderedDOMComponentsWithTag(component, 'input')[1];
    Simulate.change(checkbox, {target: {checked: true}});

    Simulate.click(clearButton);

    tasks = scryRenderedDOMComponentsWithTag(component, 'li');

    expect(tasks.length).to.equal(1)
    expect(tasks[0].textContent).to.equal('walk dog')
  })
});