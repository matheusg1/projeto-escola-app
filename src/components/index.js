export default function StandardInput(props){

    return(
        <input type={props.type} className="form-control form-control-lg mb-3" 
        placeholder={props.placeholder}
        value={props.value}
        onChange={props.onChange}
        disabled={props.disabled}
        />
    );
}