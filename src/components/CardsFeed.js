import React from "react";
import { FixedSizeList as List } from "react-window";
import { SingleCard } from "./SingleCard";

export class CardsFeed extends React.PureComponent {
	render() {
		return (
			<List
				itemData={this.props.cardsInFeed}
				height={750}
				itemCount={this.props.cardsInFeed.length}
				itemSize={180}
			>
				{({ data, index, style }) => {
					const card = data[index];
					const height = style.height - 10;
					const quantity = this.props.deck.quantity[card.id];
					return (
						<div style={{ ...style, padding: 5 }}>
							<SingleCard
								addToDeck={this.props.addToDeck}
								height={height}
								card={card}
								quantity={quantity}
							/>
						</div>
					);
				}}
			</List>
		);
	}
}
