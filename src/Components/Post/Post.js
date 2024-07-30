import React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";

const Post = ({ post: { title, body, imgUrl, author, description }, index }) => {

    const style = {
        position: "absolute",
        top: "800px",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: "80%",
        bgcolor: "background.paper",
        border: "2px solid #000",
        boxShadow: 24,
        p: 4,
        overFlow:"auto",
    };
    const OVERLAY_STYLE = {
        position: "fixed",
        display: "flex",
        justifyContent: "center",
        top: "0",
        left: "0",
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(0,0,0, .8)",
        zIndex: "1000",
        overflowY: "auto"
    };
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const dangerousMarkup = { __html: body };
    return (
        
        

        <div className="post-container">
            <Button onClick={handleOpen}>
               <Typography variant="h6" component="h6">
                    <a>read full blog</a>
                </Typography>
            </Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                style={OVERLAY_STYLE}
            >
                <Box sx={style}>
                <Typography id="modal-modal-title" variant="h1" component="h1">
                    {title}
                </Typography>
                <Typography id="modal-modal-description" sx={{ mt: 4 }}>
                    <img className="image" src={imgUrl} alt="post" />
                    <Typography variant="h4" component="h4" dangerouslySetInnerHTML={dangerousMarkup}></Typography>
                    <div className="info">	
                        <h4>Written by: {author}</h4>
                    </div>
                </Typography>
                </Box>
            </Modal>
            <h1 className="heading">
                {title}
            </h1>
            <img className="image" src={imgUrl} alt="post" />
            <p>{description}</p>
            <div className="info">	
                <h4>Written by: {author}</h4>
            </div>
        </div>
    );
};
export default Post;
