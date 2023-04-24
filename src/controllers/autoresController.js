import autores from "../models/Autor.js";

class AutorController {

    static listarAutores = (req, res) => {
        autores.find().exec()
        .then(autores => {
            res.status(200).json(autores)
        })
        .catch(err => {
            console.error(err);
            res.status(500).json({error: 'Erro na busca de autores!'})
          });
    }

    static listarAutorPorId = async (req, res) => {
        const id = req.params.id;
      
        try {
          const autor = await autores.findById(id);
          res.status(200).send(autor);
        } catch (err) {
          res.status(400).send({ message: `${err.message} - ID do Autor não localizado!` });
        }
    }

    static cadastrarAutores = (req, res) => {
        let autor = new autores(req.body);
      
        autor.save()
          .then((autorSalvo) => {
            res.status(201).send(autorSalvo.toJSON());
          })
          .catch((err) => {
            res.status(500).send({ message: `${err.message} - FALHA AO CADASTRAR NOVO AUTOR!` });
          });
    }

    static atualizarAutores = (req, res) => {
        const id = req.params.id;
      
        autores.findByIdAndUpdate(id, { $set: req.body })
          .then(() => {
            res.status(200).send({ message: 'Autor atualizado com sucesso!' });
          })
          .catch((err) => {
            res.status(500).send({ message: err.message });
          });
    }

    static excluirAutor = (req, res) => {
        const id = req.params.id;
  
        autores.findByIdAndDelete(id, { $set: req.body })
        .then(() => {
          res.status(200).send({ message: 'Autor Deletado com sucesso!' });
        })
        .catch((err) => {
          res.status(500).send({ message: err.message });
        });
      }
}

export default AutorController
