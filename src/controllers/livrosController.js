import livros from "../models/Livro.js";

class LivroController {

    static listarLivros = (req, res) => {
        livros.find().exec()
        .then(livros => {
          res.status(200).json(livros)
        })
        .catch(err => {
          console.error(err);
          res.status(500).json({error: 'Erro na busca de livros!'})
        });
    }

    static listarLivroPorId = async (req, res) => {
        const id = req.params.id;
      
        try {
          const livro = await livros.findById(id);
          res.status(200).send(livro);
        } catch (err) {
          res.status(400).send({ message: `${err.message} - ID do Livro não localizado!` });
        }
    }

    static cadastrarLivros = (req, res) => {
        let livro = new livros(req.body);
      
        livro.save()
          .then((livroSalvo) => {
            res.status(201).send(livroSalvo.toJSON());
          })
          .catch((err) => {
            res.status(500).send({ message: `${err.message} - FALHA AO CADASTRAR NOVO LIVRO!` });
          });
    }
    
    static atualizarLivros = (req, res) => {
        const id = req.params.id;
      
        livros.findByIdAndUpdate(id, { $set: req.body })
          .then(() => {
            res.status(200).send({ message: 'Livro atualizado com sucesso!' });
          })
          .catch((err) => {
            res.status(500).send({ message: err.message });
          });
    }

    static excluirLivro = (req, res) => {
      const id = req.params.id;

      livros.findByIdAndDelete(id, { $set: req.body })
      .then(() => {
        res.status(200).send({ message: 'Livro Deletado com sucesso!' });
      })
      .catch((err) => {
        res.status(500).send({ message: err.message });
      });
    }
      
}

export default LivroController
