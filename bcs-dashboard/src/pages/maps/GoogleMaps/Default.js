import React from "react";
import styled from "styled-components";

import { CardContent, Card as MuiCard, Typography } from "@material-ui/core";
import { spacing } from "@material-ui/system";

import GoogleMapReact from "google-map-react";

const Card = styled(MuiCard)(spacing);

const Spacer = styled.div(spacing);

const GoogleMapReactWrapper = styled.div`
  height: 300px;
  width: 100%;
`;

class Default extends React.Component {
  static defaultProps = {
    center: {
      lat: 40.712784,
      lng: -74.005941
    },
    zoom: 14
  };

  getMapOptions = maps => {
    return {
      fullscreenControl: true,
      mapTypeControl: true,
      mapTypeId: maps.MapTypeId.ROADMAP,
      scaleControl: true,
      scrollwheel: false,
      streetViewControl: true
    };
  };

  render = () => (
    <Card mb={1}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Default Map
        </Typography>
        <Typography variant="body2" gutterBottom>
          Displays the default road map view.
        </Typography>

        <Spacer mb={6} />

        <GoogleMapReactWrapper>
          <GoogleMapReact
            options={this.getMapOptions}
            bootstrapURLKeys={{
              key: "AIzaSyA-aWrwgr64q4b3TEZwQ0lkHI4lZK-moM4"
            }}
            defaultCenter={this.props.center}
            defaultZoom={this.props.zoom}
          />
        </GoogleMapReactWrapper>
      </CardContent>
    </Card>
  );
}

export default Default;
