import React, { Component } from 'react';

class ItemSelector extends Component
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
        // Generate options from given items, if any.
        let options =
            (this.props.items === undefined || this.props.items === null)
                ? []
                : this.props.items.map((itm) =>
                    <option value={itm}>
                        {itm}
                    </option>
                );

        return (
            <select
                value={this.props.selectedItem}
                onChange={(event) => this.handleChange(event)}
                className={this.props.className} hidden={this.props.hidden}>
                <option value="" defaultValue disabled hidden>
                    {this.props.hintItem}
                </option>
                {options}
            </select>
        )
    }
}

export default ItemSelector;