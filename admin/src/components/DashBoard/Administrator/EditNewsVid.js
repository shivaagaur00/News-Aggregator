// import React, { useState } from 'react';
// import { useNewsContext } from '../../../context/context';
// import { Card, CardContent, TextField, Button } from '@mui/material';
// import { useParams } from 'react-router-dom';

// const EditNewsVid = () => {
//   const { news, updateNews } = useNewsContext();
//   const { id } = useParams();
//   const videoNews = news.approvedNewsVid.find((item) => item.id === id);

//   const [formData, setFormData] = useState({
//     title: videoNews?.title || '',
//     description: videoNews?.description || '',
//     videoUrl: videoNews?.videoUrl || '',
//   });

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     updateNews(id, formData);
//   };

//   return (
//     <div className="flex justify-center items-center min-h-screen bg-gray-100">
//       <Card sx={{ maxWidth: 500, p: 3, boxShadow: 3, borderRadius: 2 }}>
//         <CardContent>
//           <h2 className="text-2xl font-bold text-gray-800 mb-4">Edit News Video</h2>
//           <form onSubmit={handleSubmit} className="space-y-4">
//             <TextField
//               fullWidth
//               label="Title"
//               name="title"
//               value={formData.title}
//               onChange={handleChange}
//               variant="outlined"
//             />
//             <TextField
//               fullWidth
//               label="Description"
//               name="description"
//               value={formData.description}
//               onChange={handleChange}
//               variant="outlined"
//               multiline
//               rows={4}
//             />
//             <TextField
//               fullWidth
//               label="Video URL"
//               name="videoUrl"
//               value={formData.videoUrl}
//               onChange={handleChange}
//               variant="outlined"
//             />
//             <Button type="submit" variant="contained" color="primary" fullWidth>
//               Update Video
//             </Button>
//           </form>
//         </CardContent>
//       </Card>
//     </div>
//   );
// };

// export default EditNewsVid;
