const StandardSelect = (props) => {
    return (
        <select className="form-select form-select-lg mb-3" onChange={props.onChange}>
            {props.children}            
        </select>
    )
}

export default StandardSelect;