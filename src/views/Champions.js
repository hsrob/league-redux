/*global __CLIENT__*/
import React, {Component, PropTypes} from 'react';
import {bindActionCreators} from 'redux';
import DocumentMeta from 'react-document-meta';
import {connect} from 'react-redux';
import * as championActions from '../ducks/champions';
import {isLoaded, load as loadChampions} from '../ducks/champions';
import {initializeWithKey} from 'redux-form';
let mui = require('material-ui');
let _ = require('lodash');
let {
    Avatar,
    Card,
    CardActions,
    CardExpandable,
    CardHeader,
    CardMedia,
    CardText,
    CardTitle,
    FlatButton,
    Styles
    } = mui;
let { Colors, Typography } = Styles;
let ThemeManager = new Styles.ThemeManager();

@connect(
    state => ({
        champions: state.champions.data,
        error: state.champions.error,
        loading: state.champions.loading
    }),
    dispatch => ({
        ...bindActionCreators({...championActions}, dispatch)
})
)
export default class Champions{
    static propTypes = {
        champions: PropTypes.array,
        error: PropTypes.string,
        loading: PropTypes.bool,
        load: PropTypes.func.isRequired
    };

    static childContextTypes = {
        muiTheme: React.PropTypes.object
    };

    getChildContext() {
        return {
            muiTheme: ThemeManager.getCurrentTheme()
        }
    }

    static fetchData(store) {
        console.log('fetchData from', store);
        if (!isLoaded(store.getState())) {
            return store.dispatch(loadChampions());
        }
    }

    render() {
        const { champions, error, loading, dispatch, load } = this.props;
        let champChunks = champions && champions.length ? _.chunk(champions,  3): null;
        console.log('champions', champions);
        let getAvatar = (imageName) => { return "http://ddragon.leagueoflegends.com/cdn/5.2.1/img/champion/" + imageName;};
        return (
            <div id="champion-list">
                {champChunks &&
                _.map(champChunks, (chunk) => {
                    return (
                        <div className="row">
                            {
                                _.map(chunk, (champ) => {
                                    return (
                                        <div className="col-xs-4">
                                            <Card key={champ.id}>
                                                <CardHeader title={champ.name} subtitle={champ.title} avatar={getAvatar(champ.image.full)} />
                                                <CardText>
                                                    {champ.blurb}
                                                </CardText>
                                            </Card>
                                        </div>
                                    )
                                })
                            }
                        </div>);
                })
                }
            </div>
        );
    }
}
