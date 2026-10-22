
import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
} from "react";

export type Produto = {
  nome: string;
  descricao?: string;
  detalhe?: string;
  preco: number | string;
  emoji: string;
};

export type ItemCarrinho = {
  id: string;
  nome: string;
  descricao: string;
  preco: number;
  emoji: string;
  quantidade: number;
};

type CarrinhoContexto = {
  itens: ItemCarrinho[];
  adicionar: (produto: Produto) => void;
  alterarQuantidade: (id: string, delta: number) => void;
  remover: (id: string) => void;
  limpar: () => void;
  subtotal: number;
};

const Contexto = createContext<CarrinhoContexto | undefined>(undefined);

export function CarrinhoProvider({ children }: { children: ReactNode }) {
  const [itens, setItens] = useState<ItemCarrinho[]>([]);

  function adicionar(produto: Produto) {
    const preco =
      typeof produto.preco === "number"
        ? produto.preco
        : Number(
            produto.preco
              .replace(/[R$\s]/g, "")
              .replace(/\./g, "")
              .replace(",", ".")
          );

    const id = produto.nome;

    setItens((atuais) => {
      const existente = atuais.find((item) => item.id === id);

      if (existente) {
        return atuais.map((item) =>
          item.id === id
            ? { ...item, quantidade: item.quantidade + 1 }
            : item
        );
      }

      return [
        ...atuais,
        {
          id,
          nome: produto.nome,
          descricao: produto.descricao ?? produto.detalhe ?? "",
          preco,
          emoji: produto.emoji,
          quantidade: 1,
        },
      ];
    });
  }

  function alterarQuantidade(id: string, delta: number) {
    setItens((atuais) =>
      atuais
        .map((item) =>
          item.id === id
            ? { ...item, quantidade: item.quantidade + delta }
            : item
        )
        .filter((item) => item.quantidade > 0)
    );
  }

  function remover(id: string) {
    setItens((atuais) => atuais.filter((item) => item.id !== id));
  }

  function limpar() {
    setItens([]);
  }

  const subtotal = itens.reduce(
    (total, item) => total + item.preco * item.quantidade,
    0
  );

  return (
    <Contexto.Provider
      value={{ itens, adicionar, alterarQuantidade, remover, limpar, subtotal }}
    >
      {children}
    </Contexto.Provider>
  );
}

export function useCarrinho() {
  const contexto = useContext(Contexto);

  if (!contexto) {
    throw new Error("useCarrinho precisa estar dentro de CarrinhoProvider.");
  }

  return contexto;
}

export function dinheiro(valor: number) {
  return valor.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}
