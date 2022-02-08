import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Header from '../components/Header';
import userEvent from '@testing-library/user-event';
const mockedUsedNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
   ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedUsedNavigate,
}));
test('<Header/>',()=>{
    render(
        <Header/>
    )
    //validation search field is empty
    const btnSearch = screen.getByTestId('button-search');
    fireEvent.click(btnSearch);
    expect( screen.getByTestId('alerta').textContent ).toBe('Field search is not valid');
    //validation search field is well
    userEvent.type(screen.getByTestId('input-search'),'react');
    fireEvent.click(btnSearch);
    expect( screen.queryByTestId('alerta') ).not.toBeInTheDocument();
})