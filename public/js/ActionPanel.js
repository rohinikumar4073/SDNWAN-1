(function (nx) {
    nx.define('com.cisco.ActionPanel', nx.ui.Component, {
        view: {
            content: [
                {
                    tag: 'button',
                    props: {
                        type: 'button',
                        'class': 'btn btn-default'
                    },
                    content: 'Add Node',
                    events: {
                        click: '{createNode}'
                    }
                },
                {
                    content: [
                        {
                            tag: 'label',
                            content: 'Source ID:'
                        },
                        {
                            name: '_source',
                            tag: 'input'
                        },
                        {
                            tag: 'label',
                            content: 'Target ID:'
                        },
                        {
                            name: '_target',
                            tag: 'input'
                        },
                        {
                            tag: 'button',
                            props: {
                                type: 'button',
                                'class': 'btn btn-default'
                            },
                            content: 'Add Link',
                            events: {
                                click: '{#_onAddLink}'
                            }
                        }
                    ]
                }
            ]
        },
        properties: {
            _sourceId: null,
            _targetId: null
        },
        methods: {
            _onAddLink: function (inSender, inEvent) {
                var source = this.view('_source');
                var target = this.view('_target');
                var sourceId = source.get('value');
                var targetId = target.get('value');
                if (!sourceId) {
                    source.dom().focus();
                }
                if (!target) {
                    target.dom().focus();
                }
                this.model().createLink({
                    source: sourceId,
                    target: targetId
                });
            }
        }
    })
})(nx);