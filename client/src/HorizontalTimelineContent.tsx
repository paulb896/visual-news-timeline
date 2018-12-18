/* tslint:disable */
import * as PropTypes from 'prop-types';
import * as React from 'react';
import HorizontalTimeline from 'react-horizontal-timeline';
import SwipeableViews from 'react-swipeable-views';
import HorizontalTimelineConfigurator from './HorizontalTimelineConfigurator';

export default class HorizontalTimelineContent extends React.Component {

  public static propTypes = {
    content: PropTypes.arrayOf(PropTypes.object).isRequired
  }
  private dates : string[];
  constructor(props) {
    super(props);
    this.state = {
      value: 0,
      previous: 0,
      showConfigurator: false,

      // timelineConfig
      minEventPadding: 20,
      maxEventPadding: 120,
      linePadding: 100,
      labelWidth: 300,
      fillingMotionStiffness: 150,
      fillingMotionDamping: 25,
      slidingMotionStiffness: 150,
      slidingMotionDamping: 25,
      stylesBackground: 'transparent',
      stylesForeground: '#2C3E50',
      stylesOutline: 'rgba(10, 100, 100, 0.05)',
      isTouchEnabled: true,
      isKeyboardEnabled: true,
      isOpenEnding: true,
      isOpenBeginning: true
    };
  }

  public componentWillMount() {
    // @ts-ignore
    this.dates = this.props.content.map((entry) => entry.date);
  }

  public componentWillReceiveProps(nextProps) {
    this.dates = nextProps.content.map((entry) => entry.date);
  }

  public render() {
    const state = this.state;

    // @ts-ignore
    const views = this.props.content.map((entry, index) => {
      return (
        <div className='container' key={index}>
          { entry.component }
        </div>
      );
    });

    let configurator = (<div></div>);
    // @ts-ignore
    if (this.state.showConfigurator) {
      configurator = (
        <HorizontalTimelineConfigurator
          setConfig={(key, value) => {
            this.setState({ [key]: value });
          }}
          {...this.state}
        />
      );
    }

    return (
      <div>
        <div style={{ width: '90%', height: '100px', margin: '0 auto' }}>
          <HorizontalTimeline
          // @ts-ignore
            fillingMotion={{ stiffness: state.fillingMotionStiffness, damping: state.fillingMotionDamping }}
            // @ts-ignore
            index={this.state.value}
            indexClick={(index) => {
              // @ts-ignore
              this.setState({ value: index, previous: this.state.value });
            }}

            // @ts-ignore
            isKeyboardEnabled={state.isKeyboardEnabled}
            // @ts-ignore
            isTouchEnabled={state.isTouchEnabled}
            // @ts-ignore
            labelWidth={state.labelWidth}
            // @ts-ignore
            linePadding={state.linePadding}
            // @ts-ignore
            maxEventPadding={state.maxEventPadding}
            // @ts-ignore
            minEventPadding={state.minEventPadding}
            // @ts-ignore
            slidingMotion={{ stiffness: state.slidingMotionStiffness, damping: state.slidingMotionDamping }}
            styles={{
              // @ts-ignore
              background: state.stylesBackground,
              // @ts-ignore
              foreground: state.stylesForeground,
              // @ts-ignore
              outline: state.stylesOutline
            }}
            values={ this.dates }
            // @ts-ignore
            isOpenEnding={state.isOpenEnding}
            // @ts-ignore
            isOpenBeginning={state.isOpenBeginning}
            getLabel = { (date) => date && date.indexOf('T') && date.indexOf('Z') ? `${date.split('T')[0]} ${date.split('T')[1].split('Z')[0]}` : '' }
          />
        </div>
        <div className='text-center'>
          <SwipeableViews
          // @ts-ignore
            index={this.state.value}
            onChangeIndex={(value, previous) => {
              this.setState({ value, previous });
            }}
            resistance={true}>
            {views}
          </SwipeableViews>
        </div>
        <div className='checkbox text-center' hidden={true} >
          <label>
            <input
              onChange={() => {
                // @ts-ignore
                this.setState({ showConfigurator: !this.state.showConfigurator });
              }}
              type='checkbox'
            />
            Configure the Timeline
          </label>
        </div>
        { configurator }
      </div>
    );
  }
}