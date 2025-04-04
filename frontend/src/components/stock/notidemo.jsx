import CustomNotification from "./CustomNotification";




const [open, setOpen] = useState(false);
const [severity, setSeverity] = useState("");
const [message, setMessage] = useState("");

const handleClose = (event, reason) => {
if (reason === "clickaway") return; // Prevent closing if clicked outside
setOpen(false); // Close Notification
};






<CustomNotification mt={-1.3} mb={-1} severity={severity} sx={{mt:7,mr:-1}} message={message} open={open} onClose={handleClose} image={`${api_url}/${productData.image}`} />







onClick={async () => {
    setSeverity("success");
    setMessage("Product Ordered");
    setOpen(true);

}}