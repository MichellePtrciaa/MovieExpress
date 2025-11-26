import movieModel from "../models/movieModel.js";

export const listMovie = async (req, res) => {
    try {
        const movies = await movieModel
            .find({ createdBy: req.user?.user_id })
            .sort({ createdAt: -1 });

        return res.status(200).json({
            message: "Daftar movie",
            data: movies
        });
    } catch (error) {
        return res.status(500).json({
            message: "Error",
            error: error.message,
            data: null
        });
    }
};

export const createMovie = async (req, res) => {
    try {
        const { judul, sutradara, tahunRilis } = req.body;

        if (!judul || !sutradara || !tahunRilis) {
            return res.status(400).json({
                message: "Semua data wajib di isi",
                data: null
            });
        }

        const movie = await movieModel.create({
            judul,
            sutradara,
            tahunRilis,
            createdBy: req.user?.user_id
        });

        return res.status(201).json({
            message: "Movie berhasil ditambahkan",
            data: movie
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message,
            data: null
        });
    }
};

export const updateMovie = async (req, res) => {
    try {
        const id = req.params?.id;
        const { judul, sutradara, tahunRilis } = req.body;

        if (!id) {
            return res.status(400).json({
                message: "Id movie wajib di isi",
                data: null
            });
        }

        const updatedMovie = await movieModel.findOneAndUpdate(
            { _id: id, createdBy: req.user?.user_id },
            { judul, sutradara, tahunRilis },
            { new: true }
        );

        if (!updatedMovie) {
            return res.status(404).json({
                message: "Movie tidak ditemukan",
                data: null
            });
        }

        return res.status(200).json({
            message: "Movie berhasil di update",
            data: updatedMovie
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message,
            data: null
        });
    }
};

export const detailMovie = async (req, res) => {
    try {
        const id = req.params?.id;

        if (!id) {
            return res.status(400).json({
                message: "Id movie wajib di isi",
                data: null
            });
        }

        const movie = await movieModel.findOne({
            _id: id,
            createdBy: req.user?.user_id
        });

        if (!movie) {
            return res.status(404).json({
                message: "Movie tidak ditemukan",
                data: null
            });
        }

        return res.status(200).json({
            message: "Detail Movie",
            data: movie
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message,
            data: null
        });
    }
};

export const deleteMovie = async (req, res) => {
    try {
        const id = req.params.id;

        if (!id) {
            return res.status(400).json({
                message: "ID movie wajib di isi",
                data: null
            });
        }

        const movie = await movieModel.findOneAndDelete({
            _id: id,
            createdBy: req.user?.user_id
        });

        if (!movie) {
            return res.status(404).json({
                message: "Movie tidak ditemukan",
                data: null
            });
        }

        return res.status(200).json({
            message: "Movie berhasil dihapus",
            data: null
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message,
            data: null
        });
    }
};
