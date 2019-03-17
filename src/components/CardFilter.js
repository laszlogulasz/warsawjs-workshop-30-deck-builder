import React from "react";
import { Input, Dropdown } from "semantic-ui-react";
import { debounce } from "throttle-debounce";

export class CardFilter extends React.Component {
	onInputChange = debounce(300, this.props.setSearchText);
	render() {
		return (
			<Input
				action={
					<Dropdown
						onChange={(e, { value }) => this.props.setCardsTypeFilter(value)}
						button
						basic
						//new object every time
						options={[
							{ key: "ALL", text: "Wszystkie", value: "ALL" },
							{ key: "MINION", text: "Stronnik", value: "MINION" },
							{ key: "SPELL", text: "Zaklęcie", value: "SPELL" },
							{ key: "WEAPON", text: "Broń", value: "WEAPON" }
						]}
						value={this.props.cardsTypeFilter}
					/>
				}
				onChange={(e, { value }) => this.onInputChange(value)}
				icon="search"
				iconPosition="left"
				fluid
				placeholder="Szukaj..."
			/>
		);
	}
}
