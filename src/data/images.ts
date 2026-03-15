const images = import.meta.glob("@/assets/*.webp", {
  eager: true,
  import: "default",
}) as Record<string, string>;

const imageByName: Record<string, string> = {};
for (const path in images) {
  const fileName = path.split("/").pop()!;
  imageByName[fileName] = images[path];
}

export {
  imageByName,
};
