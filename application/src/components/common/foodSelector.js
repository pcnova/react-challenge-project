import React, { Component } from 'react';

class FoodSelector extends Component
{
    constructor(props)
    {
        super(props)
    }

    handleChange = (event) =>
    {
        // Pass selected value back to parent.
        let selectedValue = event.target.value;
        this.props.onItemSelected(selectedValue);
    }

    render()
    {
        return (
            <select
                value={this.props.selectedItem}
                onChange={(event) => this.handleChange(event)}
                className={this.props.className}>
                <option value="" defaultValue disabled hidden>Lunch menu</option>
                <option value="Soup of the Day">Soup of the Day</option>
                <option value="Linguini With White Wine Sauce">Linguini With White Wine Sauce</option>
                <option value="Eggplant and Mushroom Panini">Eggplant and Mushroom Panini</option>
                <option value="Chili Con Carne">Chili Con Carne</option>
            </select>
        )
    }
}

export default FoodSelector;