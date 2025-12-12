const { request, response } = require('express');
const {
    getMateriaisDB,
    getMaterialByIdDB,
    addMaterialDB,
    updateMaterialDB,
    deleteMaterialDB
} = require('../usecases/materiaisUseCases');

// GET ALL
const getMateriais = async (request, response) => {
    try {
        const materiais = await getMateriaisDB();
        return response.status(200).json(materiais);
    } catch (err) {
        return response.status(400).json({
            status: "error",
            message: "Erro ao consultar os materiais: " + err
        });
    }
};

// GET BY ID
const getMaterialById = async (request, response) => {
    try {
        const id = parseInt(request.params.id);
        const material = await getMaterialByIdDB(id);

        if (!material)
            return response.status(404).json({ message: "Material não encontrado." });

        return response.status(200).json(material);
    } catch (err) {
        return response.status(400).json({
            status: "error",
            message: "Erro ao consultar o material: " + err
        });
    }
};

// INSERT
const addMaterial = async (request, response) => {
    try {
        const novo = await addMaterialDB(request.body);
        return response.status(201).json(novo);
    } catch (err) {
        return response.status(400).json({
            status: "error",
            message: "Erro ao inserir o material: " + err
        });
    }
};

// UPDATE
const updateMaterial = async (request, response) => {
    try {
        const atualizado = await updateMaterialDB(request.body);
        return response.status(200).json(atualizado);
    } catch (err) {
        return response.status(400).json({
            status: "error",
            message: "Erro ao atualizar o material: " + err
        });
    }
};

// DELETE
const deleteMaterial = async (request, response) => {
    try {
        const id = parseInt(request.params.id);
        const removido = await deleteMaterialDB(id);
        return response.status(200).json({ message: removido });
    } catch (err) {
        return response.status(400).json({
            status: "error",
            message: "Erro ao remover o material: " + err
        });
    }
};

module.exports = {
    getMateriais,
    getMaterialById,
    addMaterial,
    updateMaterial,
    deleteMaterial
};
