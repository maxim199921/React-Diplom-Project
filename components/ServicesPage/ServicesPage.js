import React from 'react';
import PropTypes from 'prop-types';
import {connect} from "react-redux";

import ServicesComments from './ServicesComments/ServicesComments'
import './ServicesPage.css';
import {loadDataComments} from '../../redux/ActionCreaters/CommentsActions'
import {returnSwitchLastArr} from '../../modules/modules'


class ServicesPage extends React.PureComponent {

  static propTypes = {
      commentsList: PropTypes.arrayOf(
          PropTypes.shape({
              name: PropTypes.string.isRequired,
              comment: PropTypes.string.isRequired,
          })
      ),
  };

    componentDidMount = () => {
        this.props.dispatch(loadDataComments());
    };

  render() {

      let commentList = this.props.commentsList.map((item, index) =>
          <ServicesComments key={index}
                      info={item}/>
      );

    return (
      <div className="ServicesPage">
          <div className="container">
            <div className="row">
                <div className="col-md-6">
                    <div className="row">
                        <div className="col-md-12 ServicesPage-wrapper">
                            <h2 className="ServicesPage-Comments-text">Comments</h2>
                        </div>
                        <div className="col-md-12">
                            <div className="row">
                                {commentList}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="row">
                        <div className="col-md-12 ServicesPage-wrapper">
                            <h2 className="ServicesPage-services-text">Services</h2>
                        </div>
                        <div className="col-md-12">
                            <div className="row">
                                <div className="col-12 col-sm-6">
                                    <div className="row">
                                        <div className="col-12 HomePage-Services-img-wrapper">
                                            <div className="HomePage-Services-img1">
                                                <span hidden={true}>img</span>
                                            </div>
                                        </div>
                                        <div className="col-12">
                                            <p className="HomePage-Services-text">Work with love</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-12 col-sm-6">
                                    <div className="row">
                                        <div className="col-12 HomePage-Services-img-wrapper">
                                            <div className="HomePage-Services-img2">
                                                <span hidden={true}>img</span>
                                            </div>
                                        </div>
                                        <div className="col-12">
                                            <p className="HomePage-Services-text">Best guarantee</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-12 col-sm-6">
                                    <div className="row">
                                        <div className="col-12 HomePage-Services-img-wrapper">
                                            <div className="HomePage-Services-img3">
                                                <span hidden={true}>img</span>
                                            </div>
                                        </div>
                                        <div className="col-12">
                                            <p className="HomePage-Services-text">Permanent discount</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-12 col-sm-6">
                                    <div className="row">
                                        <div className="col-12 HomePage-Services-img-wrapper">
                                            <div className="HomePage-Services-img4">
                                                <span hidden={true}>img</span>
                                            </div>
                                        </div>
                                        <div className="col-12">
                                            <p className="HomePage-Services-text">Fast delivery</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
          </div>
      </div>
    );

  }

}


const mapStateToProps = function (state) {
    return {
        commentsList: returnSwitchLastArr(state.comments.commentsList, -5),
    };
};


export default connect(mapStateToProps)(ServicesPage);
