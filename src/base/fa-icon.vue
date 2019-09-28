<script>
import fontawesome from '@fortawesome/fontawesome'
export default {
    name: 'fa-icon',
    functional: true,
    props: {
        name: {
            type: String,
            required: true
        }
    },
    render: (h, { props: { name }, data}) => {
        let { abstract } = fontawesome.icon({ iconName: name })
        let result = convertNode(h, abstract[0], data)
        return result
    }
}
function convertNode(h, {tag, attributes, children}, {staticClass=''} = {}){
    let child = (children || []).map(n => convertNode.call(null, h, n))
    let allProps = Object.keys(attributes).reduce((h, k) => {
        switch(k){
            case 'class': h[k] = `${attributes[k]} ${staticClass}`;break;
            default : h['attrs'][k] = attributes[k];break;
        }
        return h
    }, {'class': '', style: {}, attrs: {}})
    return h(tag, allProps, child)
}
</script>