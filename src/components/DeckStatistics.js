import React from "react";
import { Divider, Statistic } from "semantic-ui-react";

export class DeckStatistics extends React.Component {
	render() {
		return (
			<React.Fragment>
				<Statistic floated="left" size="mini">
					<Statistic.Value>{this.props.cardCount}/30</Statistic.Value>
					<Statistic.Label>Kart</Statistic.Label>
				</Statistic>
				<Statistic floated="right" size="mini">
					<Statistic.Value>{this.props.totalPackCost}</Statistic.Value>
					<Statistic.Label>Koszt</Statistic.Label>
				</Statistic>
				<Divider hidden clearing fitted />
			</React.Fragment>
		);
	}
}
