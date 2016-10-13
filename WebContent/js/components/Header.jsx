define([
    'react', 'jquery'
], function(React, $) {
    var SearchForm = React.createClass({
        render: function() {
            return (
                <div id="vz-search-form">
                    <div className="search_inner">
                        <div className="search_options">
                            <div role="application" className="form-item">
                                <span id="vz-search-mobile-close" className="vz-search-mobile-close visible-xs"></span>
                                <div className="form-item">
                                    <div id="edit-search-content" className="form-text">
                                        <span id="span_arrow_top" className="span_arrow"></span>

                                        <label className="sr-only">Search Content</label>
                                        <input type="text" className="formInput"/>
                                        <a id="hrefHeaderSearch" title="Search" href="javascript:;" className="form-submit"></a>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            );
        }
    });

    var UserProfile = React.createClass({
        render: function() {
            return (
                <div className="dropdown pull-right pull-mobile-none" id="profile-menu">
                    <a data-toggle="dropdown" className="dropdown-toggle" href="#" aria-haspopup="true" aria-expanded="false">
                        <span className="name">Username</span>
                        <span className="glyphicon glyphicon-menu-down"></span>
                        <img alt="User's Profile Avatar" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAMAAABg3Am1AAAAWlBMVEXHyMrJyszMzc/P0NLLzM6wsrSsrrC2uLqfoaOjpaebnaC6vL6ztbemqKrR0tSWmJqpq63W19jT1NXOz9GHiYzU1deQkpWMjpGYmpyTlZjZ2tuDhYepq67Cw8WqqozrAAABu0lEQVRIx8WUSYKDIBBFFYOgDEYckNjc/5otELvCkGnVb5XFf/4qNFT/Qf3Ih/FL4APFhy01+77PPUdBehOv6H6iGUKglOPI6v0BjEAp5RGq9RxBpkMpGv7xaOrnGH2ZplBSzrM5pWsaMLJ8I3TKisCIBJ9HOofIYIAA+YatOVdZMO55iQsCVeo0ogKXl8IUWJTvgAoosEMJskBFXKBWUxJmqxRUQIGUTA9bAS3cUKECjsgVYL31BTRd/FDnQcFE3PQlTDeGLUDwEynFhp4WGMQhKD/TXbgEYam3orCR0c0ES5wrLGNHuxxK5RhmyoXqEHLI7akwViKHjC+EG7umtLfbK6H5SbGZAKfkDNwmqCMPpxS/BydUSZ7dC4IQv2kvjDimcUL2ps8lfEWUDwXRtwRLuIrD4I/4Dcbka4WZvCE4+aNfQv5xIqgIQ8l1ICdCM5dP/3FQ4Qy+rhtnHnH8DHkoSCsUGowxg8CMt5s5IEceCkA4jYkOMX2l5IubrO62lN5CPr1ba077Argu38YWd/QJLcvyjPx0rxCYVYDlV/EecNj1U3h4fvs5voPgL/AC/wLrhG9wAvsGW/0CxKlP74i8jegAAAAASUVORK5CYII="/>
                    </a>
                    <div role="menu" className="dropdown-menu profile-dropdown" id="profile-dropdown">
                        <div className="user-info">
                            <div className="user-avatar">
                                <img className="user pull-left" title="User Profile Picture" alt="User Profile Picture" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAMAAABHPGVmAAAAV1BMVEXHyMrJyszLzM7NztDR0tPT1NWxs7Wtr7HP0NLV1tiqrK+oqqy0triVl5q3ubuho6aZm526vL6Rk5aeoKPY2ducnqCNj5Klp6mkpqiJi46GiIuChIfAwsSDNt0cAAAD1ElEQVRo3uXZ21arMBCAYcIhnAmEc837P+cetO20TAgDFm/2j1dd2M8ZcKno/b+J7+Oq4L3f+rglsKsksdMnBV/4rwn/UwwKG/2eIUIVj0uV+RizEkw2fGF1TJ2TBhJN/bXqlntr5neE135hyGRBQJizRmCGL3u1F4BzUnkjAglf9MahRbBiThFg3ByBQpiDRgA1DgKVgChMI1gS882dSgJkUOEbUD3vVSUJUQ4ZSQXvcnMe8+AnwBCFbyR63i9OuAoiL0RSMAwYJUTmrrANqJ4HxiFDqrCN0AysyhBiKGhADyPMBl7ei+K7FWKEJRORoUVxDoKGGAbNOlS0VgTEMKBGc4sYCiJoQDEbMUQhCB0kXIoUG6miu+IehS4rirQumUcRQXRhm4OgEZXspvRFoaPQQZ6GB5+teR8qRYWMYh8EDW46BwSio7gHCeb5gHKbdkdBBJfVz0PNb56bd4UiAloNImZAypr5AUiNiP17xXJF5DAcmQTO9lPbVXFuqx0GfQwxaerYF9lWBClAen6ASEAgsq/NQQDRuuQbtda6SOmldyPpdAZJXQjdVjrCzd+y6+FsQMi+bEiCSHYIqeFs7xVJ1oiA1ttKK7hlDkwCZycp3ZeAcBCCeAuiuAGiOoJAW0j0jaRt3x9A+l4+kOgAItuWj8C54gySgDExAyTuOEiACBhQoQDhKsoHZIncwy4EytU08ppU051Cui7IRy5SdUvHEVDSJufl3Y0TCBSzDNMxEHp3PRDeKCEi/FsYET9jJLvfIJBkIOY4grfXwhgGEr4joR2BbMhSFO9W3AkbIqDNnyeoVLuIsG0LEfqTkSL+niFXg9A72HFRHkoB7+M6PByEbGsHwVGEdNeRbW0idF94VVwEGYT+3sXaV+Iyqo6xLYrQUYwDCWyDEITsi16VqNjM0FuLbst56Z/KpiEjMgjZFkXsiho3kNLYjS2EXhVUhjmubPVzjob7b0b3KKCYYdA2JYfXn4Z7EDrKWhkHeDdpMaCGGHQQOgpVAv1d3LzX6iWVUgORvWcrqIz6p6lqsKLWPxk0yLIE5ylRtORpqIRDl9mDqNTzxT78JhhPiRAhStKXL6k8k/n49pK0GIjwlLzcq2EaeO3XSlzv51FjQbhPU8Fg1BtqQMznwkHe82q4z4WpYtqeWy6owVFM1h5IVT7TAOShNEhwGekd+t+GV0zqTHkj0HAqXhOr003S7BsgTL8sL4wTkNn4meINyBT5R8sqasgcupYxcXZFxcUGVWR8Vc3LINf1RAp5Xc9R5IVVz++QK7sjTXFl5o5UV/anyKX9GfIPonZJmgkP8L4AAAAASUVORK5CYII="/>
                            </div>
                            <div className="user-links">
                                <h4>
                                    <span>Username</span>
                                </h4>
                                <ul className="list-unstyled">
                                    <li>
                                        <a title="My Profile" href="#">My Profile</a>
                                    </li>
                                    <li>
                                        <a title="Not User" href="#">Not User Name?</a>
                                    </li>
                                    <li>
                                        <a title="Signout" href="#">Signout</a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            );
        }
    });

    var Header = React.createClass({
        render: function() {
            return (
                <header className="vz-global-header">
                    <nav className="navbar navbar-default">
                        <div className="container-fluid">
                            <div className="navbar-header">
                                <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
                                    <span className="sr-only">Toggle navigation</span>
                                    <span className="icon-bar"></span>
                                    <span className="icon-bar"></span>
                                    <span className="icon-bar"></span>
                                </button>
                                <a className="navbar-brand" href="index.html"></a>
                                <span className="sublogo">SDN WAN</span>
                            </div>
                            <div className="leftnav">
                                <UserProfile></UserProfile>
                                <SearchForm></SearchForm>
                                <i className="fa fa-bell notifications" aria-hidden="true"></i>

                            </div>

                        </div>
                    </nav>

                </header>
            );
        }
    });

    return Header;

});
