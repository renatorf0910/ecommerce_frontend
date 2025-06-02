import React from "react";
import SaveIcon from '@mui/icons-material/Save';
import {
    Avatar,
    Button,
    Container,
    Grid,
    Paper,
    TextField,
    Typography,
} from '@mui/material';

// export default function EditProfile() {
//     return (    
//         <Container maxWidth="md" sx={{ mt: 4, mb: 'auto' }}>
//             <Paper elevation={1} sx={{ p: 10, borderRadius: 4 }}>
//                 <Grid container spacing={3} justifyContent="center">
//                     <Grid size={{ xl: 12 }} textAlign="center">
//                         <Avatar
//                             sx={{ width: 150, height: 150, mx: 'auto', mb: 1, bgcolor: '#3f51b5' }}
//                         >
//                             R
//                         </Avatar>
//                         <Typography variant="h5" fontWeight="bold" gutterBottom>
//                             Editar Perfil
//                         </Typography>
//                         <Typography variant="body2" color="text.secondary">
//                             Atualize suas informações pessoais
//                         </Typography>
//                     </Grid>

//                     <Grid size={{ xl: 6 }}>
//                         <TextField fullWidth label="Nome" variant="outlined" />
//                     </Grid>

//                     <Grid size={{ xl: 6 }}>
//                         <TextField fullWidth label="E-mail" variant="outlined" />
//                     </Grid>

//                     <Grid size={{ xl: 6 }}>
//                         <TextField fullWidth label="Senha" variant="outlined" type="password" />
//                     </Grid>

//                     <Grid size={{ xl: 6 }}>
//                         <TextField fullWidth label="Confirmar Senha" variant="outlined" type="password" />
//                     </Grid>

//                     <Grid size={{ xl: 12 }} textAlign="center">
//                         <Button
//                             variant="contained"
//                             color="primary"
//                             startIcon={<SaveIcon />}
//                             sx={{ px: 4, py: 1.5, borderRadius: 3 }}
//                         >
//                             Salvar Alterações
//                         </Button>
//                     </Grid>
//                 </Grid>
//             </Paper>
//         </Container>
//     );
// }



export default function EditProfile() {
    return (
        <div className="flex min-h-screen bg-gray-200 justify-center items-center">
            <div className="bg-white rounded-3xl shadow-xl p-10 w-full max-w-4xl flex gap-20">
                <div className="flex flex-col items-center w-1/3 border-r pr-6">
                    <div className="w-48 h-48 rounded-full overflow-hidden">
                        <Avatar
                            sx={{ width: 150, height: 150, mx: 'auto', bgcolor: '#3f51b5' }}
                        >
                            <img
                                src="https://github.com/renatorf0910.png"
                                alt="Profile"
                                className="object-cover w-full h-full"
                            />
                        </Avatar>
                    </div>
                    <h2 className="text-xl font-bold">Nome do Usuário</h2>
                    <p className="text-gray-500 text-sm mb-6">@username</p>

                    <label className="text-sm font-semibold text-gray-600">Senha</label>
                    <div className="flex items-center border rounded-md px-3 py-2 w-full mt-1 mb-4">
                        <input
                            type="password"
                            className="flex-1 outline-none"
                            placeholder="******"
                        />
                        <span className="text-gray-400 cursor-pointer">👁️</span>
                    </div>
                </div>

                <div className="w-2/3 flex flex-col justify-between">
                    <Grid size={{ xl: 6 }}>
                        <TextField fullWidth label="Nome" variant="outlined" />
                    </Grid>

                    <Grid size={{ xl: 6 }}>
                        <TextField  disabled fullWidth label="E-mail" variant="outlined" />
                    </Grid>
                    <Grid size={{ xl: 6 }}>
                        <TextField fullWidth label="Senha" variant="outlined" type="password" />
                    </Grid>
                    <Grid size={{ xl: 6 }}>
                        <TextField fullWidth label="Confirmar Senha" variant="outlined" type="password" />
                    </Grid>
                    <button className="bg-black text-white py-3 rounded-xl hover:bg-gray-800 transition">
                        Salvar
                    </button>
                </div>
            </div>
        </div>
    );
}
