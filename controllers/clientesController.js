// controllers/clientesController.js
const { 
    getClientesDB, 
    getClienteByIdDB,
    addClientesDB, 
    updateClientesDB, 
    deleteClienteDB 
} = require('../usecases/clientesUseCases');

// GET ALL
const getClientes = async (request, response) => {
    try {
        const clientes = await getClientesDB();
        return response.status(200).json(clientes);
    } catch (err) {
        return response.status(400).json({
            status: 'error',
            message: err
        });
    }
};

// GET BY ID
const getClienteById = async (request, response) => {
    try {
        const id = request.params.id;

        const cliente = await getClienteByIdDB(id);

        if (!cliente)
            return response.status(404).json({ message: "Cliente não encontrado." });

        return response.status(200).json(cliente);
    } catch (err) {
        return response.status(400).json({
            status: 'error',
            message: err
        });
    }
};

// INSERT
const addCliente = async (request, response) => {
    try {
        const cliente = await addClientesDB(request.body);
        return response.status(201).json(cliente);
    } catch (err) {
        return response.status(400).json({
            status: 'error',
            message: err
        });
    }
};

// UPDATE
const updateCliente = async (request, response) => {
    try {
        const cliente = await updateClientesDB(request.body);
        return response.status(200).json(cliente);
    } catch (err) {
        return response.status(400).json({
            status: 'error',
            message: err
        });
    }
};

// DELETE
const deleteCliente = async (request, response) => {
    try {
        const id = request.params.id;

        const result = await deleteClienteDB(id);

        return response.status(200).json({ message: result });
    } catch (err) {
        return response.status(400).json({
            status: 'error',
            message: err
        });
    }
};

module.exports = {
    getClientes,
    getClienteById,
    addCliente,
    updateCliente,
    deleteCliente
};
