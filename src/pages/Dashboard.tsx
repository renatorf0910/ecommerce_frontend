import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Dashboard() {
  return (
    <>
      <div className="min-h-screen bg-gray-100 p-6">
        <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card>
            <CardHeader>
              <CardTitle>Bem-vindo</CardTitle>
            </CardHeader>
            <h1>d</h1>
            <CardContent>
              <p>Essa ddé sua dashboard inicial. Integre com o backend DRF aqui.</p>
              <Button className="mt-4">Ver detalhes</Button>
            </CardContent>
          </Card>
        </div>
      </div>
      <Card className="w-full">
        <CardHeader>
          <img src="/produto.jpg" alt="Produto" className="rounded-md object-cover h-40 w-full" />
        </CardHeader>
        <CardContent>
          <h2 className="text-lg font-semibold">Tênis Nike</h2>
          <p className="text-sm text-muted-foreground">Conforto e estilo para o dia a dia.</p>
          <div className="mt-2 flex justify-between items-center">
            <span className="text-primary font-bold">R$ 299,90</span>
            <Button variant="outline">Comprar</Button>
          </div>
        </CardContent>
      </Card>
    </>
  );
}
