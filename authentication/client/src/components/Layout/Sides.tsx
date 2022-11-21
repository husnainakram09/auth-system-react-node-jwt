import * as React from 'react'

interface PropsType {
    side: any
}

const Sides: React.FC<PropsType> = ({ side }) => {
    return (
        side.sort((a: any, b: any) => a.order - b.order).map((single: any) => (
            <div id={single.layoutId} key={single.layoutId} style={{ padding: 10, borderRadius: 10, backgroundColor: single.colors.backgroundColor }}>
                <h6>{single.items.title}</h6>
                <div dangerouslySetInnerHTML={{ __html: single.items.description }} />
            </div>
        ))
    )
}

export default Sides