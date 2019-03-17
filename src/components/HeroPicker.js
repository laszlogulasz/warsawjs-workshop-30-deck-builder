import React, { Fragment } from "react";
import { Grid, Header, Button } from "semantic-ui-react";

import heroes from "../heroes.json";

export class HeroPicker extends React.PureComponent {
	render() {
		return (
			<Grid centered columns={3}>
				<Grid.Row>
					<Grid.Column>
						<Header dividing size="huge">
							Wybierz klasę bohatera:
						</Header>
						{heroes.map(v => (
							<Fragment key={v}>
								<Button basic fluid onClick={() => this.props.setHeroClass(v)}>
									{v}
								</Button>
								<br />
							</Fragment>
						))}
					</Grid.Column>
				</Grid.Row>
			</Grid>
		);
	}
}
